import { createDevice, Device, ExternalDataInfoFile, IPatcher, MessageEvent, ScriptDevice } from '@rnbo/js';
import { useEffect, useRef, useState } from 'react';
import { useControls } from 'leva';

interface RNBOProps {
  patcher: IPatcher;
  dependencies: Array<ExternalDataInfoFile>;
}
const RNBO : React.FC<RNBOProps> = ({patcher, dependencies}) => {
  const contextRef = useRef<AudioContext>();
  
  const [device, setDevice] = useState<Device>();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const setUp = async () => {
    contextRef.current = new AudioContext();
    const device = await createDevice({
      patcher: patcher,
      context: contextRef.current,
    });
    if (dependencies.length) await device.loadDataBufferDependencies(dependencies);

    const gainNode = contextRef.current.createGain();
    gainNode.connect(contextRef.current.destination);
    device.node.connect(gainNode);
    console.log(device.parameters);
    setDevice(device);
    setIsPlaying(true);
  };
  const controlsObj = device
    ? Object.fromEntries(
        device.parameters.map((p) => [
          p.displayName,
          Object.fromEntries([
            ['value', p.initialValue],
            ['min', p.min],
            ['max', p.max],
            ['onChange', (v: any) => (p.value = v)],
          ]),
        ]),
      )
    : {};

  useControls(controlsObj, [device]);
  useEffect(() => {
    return () => {
      if (contextRef.current) {
        contextRef.current.close();
      }
    };
  }, []);

  return <div>{!isPlaying && <button onClick={setUp}>Play</button>}</div>;
};

export default RNBO;
