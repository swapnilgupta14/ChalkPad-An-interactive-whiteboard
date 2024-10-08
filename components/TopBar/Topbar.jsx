
import store from '@/app/store';
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ExportDialog from '@/export/ExportPopup';
import { Circle, CopyIcon, Diamond, LucideImageDown, Minus, Move, Pencil, Square, Type, Eraser } from 'lucide-react';
import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { updateElement } from '../ElementManipulation/Element';
import { GlobalProps } from '../Redux/GlobalProps';
import { ShapeCache } from '../Redux/ShapeCache';
import { setAction } from '../Redux/reducers/actionSlice';
import { redo, setChanged, setElement, undo } from '../Redux/reducers/elementSlice';
import { setHover } from '../Redux/reducers/hoverSlice';
import { setSelectedElement } from '../Redux/reducers/selectedElementSlice';
import { changeTool } from '../Redux/reducers/toolSlice';
import ButtonComponent from './ButtonComponent';
import Menu from './Menu/Menu';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Mutex } from 'async-mutex';
import { io } from 'socket.io-client';
import { Input } from '../ui/input';
import { toast } from '../ui/use-toast';


const buttons = [
  { tooltip: 'Rectangle', icon: Square, shortcut: 'Rectangle - 1', tool: 'rectangle' },
  { tooltip: 'Line', icon: Minus, shortcut: 'Line - 2', tool: 'line' },
  { tooltip: 'Selection', icon: Move, shortcut: 'Selection - 3', tool: 'selection' },
  { tooltip: 'Pencil', icon: Pencil, shortcut: 'Pencil - 4', tool: 'pencil' },
  { tooltip: 'Ellipse', icon: Circle, shortcut: 'Ellipse - 5', tool: 'ellipse' },
  { tooltip: 'Diamond', icon: Diamond, shortcut: 'Diamond - 6', tool: 'diamond' },
  { tooltip: 'Text', icon: Type, shortcut: 'Text - 7', tool: 'text' },
  { tooltip: 'Eraser', icon: Eraser, shortcut: 'Eraser - 8', tool: 'eraser' },
];

const Topbar = () => {

  const dispatch = useDispatch();
  const toolIndex = useSelector(state => state.tool.index);
  const action = useSelector(state => state.action.value);
  const index = useSelector(state => state.elements.index);
  const elements = useSelector(state => state.elements.value[index][0], shallowEqual);
  const selectedElement = useSelector(state => state.selectedElement.value);
  const changed = useSelector(state => state.elements.changed);
  const toolWheel = useSelector(state => state.tool.toolWheel);
  const [open, changeOpen] = useState(false);
  const [inputRoom, setInputRoom] = useState("");
  const indexMutex = new Mutex();
  const [room, setRoom] = useState(GlobalProps.room);
  const [createClicked, setCreateClicked] = useState(false);

  const copyRoomId = () => {
    if (room) {
      navigator.clipboard.writeText(room); // Copy room ID to clipboard
      toast({
        title: "Copied Successfully",
        duration: 3000
      });
    }
  };


  const elementQueue = [];
  let isProcessing = false;

  async function processElementQueue() {
    if (elementQueue.length === 0) {
      return;
    }
    isProcessing = true;
    let tempNewArray = elementQueue.shift();
    try {
      let id = tempNewArray.id.split("#")[0];
      let i = store.getState().elements.index;
      let e = store.getState().elements.value[i][0];
      let elementCopy = [...e];
      if (GlobalProps.indexMap.has(id)) {
        const index = GlobalProps.indexMap.get(id);
        tempNewArray = { ...tempNewArray, id: id + "#" + index };
        elementCopy[index] = tempNewArray;
      } else {
        const index = store.getState().elements.value[i][0].length;
        GlobalProps.indexMap.set(id, index);
        tempNewArray = { ...tempNewArray, id: id + "#" + index };
        elementCopy.push(tempNewArray);
      }
      console.log(store.getState().elements.value[i][0]);
      console.log(GlobalProps.indexMap);
      dispatch(setElement([elementCopy, true, null]));
    } catch (error) {
      console.error("Error processing element:", error);
    } finally {
      isProcessing = false;
      processElementQueue();
    }
  }



  return (
    <div className='flex flex-row '>
      <Menu ></Menu>
      <div className='flex flex-row absolute left-1/2 transform -translate-x-1/2 rounded-md bg-white  my-1 shadow-md'>

        {buttons.map((button, index) =>(
          <div key={index} onClick={() => {
            dispatch(changeTool(buttons[index].tool))
          }}>  <ButtonComponent button={button} /> </div>
        )
        )}

        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" onClick={() => {
                changeOpen(true);
              }} style={{ width: '35px', height: '35px', position: 'relative' }} className={`rounded px-2 m-1  `}>
                <LucideImageDown className="h-4 w-4 opacity-90"></LucideImageDown>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Export</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <ExportDialog open={open} changeOpen={changeOpen} ></ExportDialog>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button onClick={() => {
          }} variant="outline" className='absolute right-2 top-2'>Collaborate</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              Speed up by using Collaboration</DialogTitle>
          </DialogHeader>
          {
            createClicked === true && room === null ? <span>Generating...</span> : null}

          {room && (
            <div className="room-id-container">

              <span>{room}</span>
              <Button onClick={copyRoomId} variant="outline" className="m-2">
                <CopyIcon className='h-4 w-4' />
              </Button>
            </div>
          )}

          <Button onClick={() => {
            if (GlobalProps.socket === null) {
              GlobalProps.socket = io(process.env.NEXT_PUBLIC_WEB_SOCKET);
            }
            let i = store.getState().elements.index;
            let e = store.getState().elements.value[i][0];
            GlobalProps.socket.emit('create-room', e)
            setCreateClicked(true);
            GlobalProps.socket.on('room-created', roomId => {
              GlobalProps.room = roomId;
              setRoom(roomId);
            });
            GlobalProps.socket.on('render-elements', async ({ tempNewArray }) => {
              elementQueue.push(tempNewArray);
              if (!isProcessing) {
                processElementQueue();
              }
            });


            GlobalProps.socket.on("delete-element-socket", ({ key }) => {
              const index = GlobalProps.indexMap.get(key);

              let i = store.getState().elements.index;
              let e = store.getState().elements.value[i][0];
              let elementCopy = [...e];

              if (ShapeCache.cache.has(elementCopy[index])) {
                ShapeCache.cache.delete(elementCopy[index]);
              }
              // console.log(elementCopy[index]);
              elementCopy[index] = null;
              dispatch(setElement([elementCopy, true, null]));
            });
          }} variant="outline" className=''>Create Room</Button>

          <div className="grid gap-4 ">
            <Input
              id="username"
              placeholder="Room-Id"
              value={inputRoom}
              onChange={(e) => {
                setInputRoom(e.currentTarget.value)
              }}
              className="col-span-3"
            />


          </div>
          <DialogFooter>

            <Button onClick={() => {
              if (GlobalProps.socket === null) {
                toast({
                  title: "No on going Session",

                  duration: 3000
                });

                return;
              }
              GlobalProps.room = null;
              GlobalProps.socket.close();
              GlobalProps.socket = null;

              setRoom(null);
              setInputRoom("");
              setCreateClicked(false);

              toast({
                title: "Session has been stopped",
                description: "Success",
                duration: 3000
              });

            }} className='bg-red-600' type="submit">Stop</Button>


            <Button onClick={() => {

              if (GlobalProps.socket === null) {

                GlobalProps.socket = io(process.env.NEXT_PUBLIC_WEB_SOCKET);

              }

              const roomId = inputRoom;
              GlobalProps.room = roomId;
              GlobalProps.socket.emit('join-room', { roomId });

              GlobalProps.socket.on('error', error => {
                toast({
                  title: "Uh oh! Something went wrong.",
                  description: error,
                  duration: 3000
                });

                GlobalProps.room = null;
                GlobalProps.socket.close();
                GlobalProps.socket = null;

                setRoom(null);
              })

              GlobalProps.socket.on('join-success', () => {
                toast({
                  title: "Join Success",
                  description: "Success",
                  duration: 3000
                });


              })
              GlobalProps.socket.on('render-elements', async ({ tempNewArray }) => {

                elementQueue.push(tempNewArray);
                if (!isProcessing) {
                  processElementQueue();
                }
              });


              GlobalProps.socket.on("delete-element-socket", ({ key }) => {

                let i = store.getState().elements.index;
                let e = store.getState().elements.value[i][0];
                const index = GlobalProps.indexMap.get(key);
                let elementCopy = [...e];

                if (ShapeCache.cache.has(elementCopy[index])) {
                  ShapeCache.cache.delete(elementCopy[index]);
                }
                elementCopy[index] = null;
                dispatch(setElement([elementCopy, true, null]));
              })


            }} type="submit">Join Room</Button>



          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default Topbar