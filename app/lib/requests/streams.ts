export const getStreams = async () => {
  const req = await fetch('http://localhost:3002/xml');
  const streams = await req.json();

  return streams;
};
