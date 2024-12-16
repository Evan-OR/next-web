// import { getStreams } from '@/lib/requests/streams';
import { Stack, Typography } from '@mui/material';
import Link from 'next/link';

const page = async () => {
  // const streamsJson = await getStreams();

  return (
    <div>
      <Typography variant="h5" style={{ color: 'white' }}>
        Streams List
      </Typography>
      <Stack>
        <Link href={'/streams/123'} color="inherit">
          Stream 123
        </Link>
        <Link href={'/streams/456'}>Stream 456</Link>
        <Link href={'/streams/789'}>Stream 789</Link>
      </Stack>
    </div>
  );
};

export default page;
