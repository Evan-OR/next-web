import { Box, Button, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import StreamSVG from './components/svgs/StreamSVG';
import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Box display={'flex'} justifyContent={'center'} alignItems={'end'} gap={12} mt={'6%'}>
        <Box display={'flex'} flexDirection={'column'} width={'100%'} height={''} maxWidth={'700px'} gap={2} mb={4}>
          <Typography variant="h3" fontWeight={'bold'}>
            Live. Interactive. Unfiltered. Commerce with a Pulse.
          </Typography>
          <Typography variant="h6">
            Step into a new way to buy and sell where sellers show, buyers ask, and everything happens live. No filters,
            no delays, just real people and real products.
          </Typography>
          <Box>
            <Link href={'/streams'}>
              <Button variant="outlined" startIcon={<SearchIcon />}>
                Browse Live Shows
              </Button>
            </Link>
          </Box>
        </Box>

        <Box>
          <StreamSVG width={'400px'} />
        </Box>
      </Box>
    </main>
  );
}
