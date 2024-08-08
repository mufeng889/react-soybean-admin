const setupWebVitals = () => {
  import('web-vitals/attribution').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
    onCLS(console.log);
    onINP(console.log);
    onTTFB(console.log);
    onLCP(console.log);
    onFCP(console.log);
  });
};

export default setupWebVitals;
