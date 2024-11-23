import { useCountDown } from 'ahooks';
import { useState } from 'react';

/**
 * count down
 *
 * @param seconds - count down seconds
 */
export default function useCountDownTimer(seconds: number) {
  const [fps, setFps] = useState(0);

  const [countdown] = useCountDown({ targetDate: fps });

  const count = Math.round(countdown / 1000);
  const isCounting = countdown > 0;
  function start(updateSeconds: number = seconds) {
    setFps(Date.now() + updateSeconds * 1000);
  }

  function stop() {
    setFps(0);
  }

  return {
    count,
    isCounting,
    start,
    stop
  };
}
