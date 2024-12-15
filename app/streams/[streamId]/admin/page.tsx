'use client';

import useWebsocket from '@/hooks/useWebsocket';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface StyledAlertProps {
  status: 'connected' | 'connecting' | 'failed';
}

const StyledAlert = styled(Alert)<StyledAlertProps>(({ theme, status }) => {
  const colorMap = {
    connected: theme.palette.success.dark,
    connecting: theme.palette.info.dark,
    failed: theme.palette.error.dark,
  };
  return {
    backgroundColor: colorMap[status],
    color: theme.palette.background.paper,
    '& .MuiAlert-icon': {
      color: theme.palette.background.paper,
    },
  };
});

const AdminPage = () => {
  const pathname = usePathname();
  const streamId = pathname.split('/')[2];

  const { socket } = useWebsocket();

  const [formData, setFormData] = useState({
    itemName: 'Test',
    bidDuration: 15,
    startingBid: 1,
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: keyof typeof formData) => {
    setFormData((prev) => ({ ...prev, [type]: e.target.value }));
  };

  const startBid = () => {
    if (!socket) {
      console.error('FAILED TO SEND WEBSOCKET EVENT');
      return;
    }
    socket.emit('startTimer', { msg: formData.itemName, duration: formData.bidDuration });
    console.log('timer started!');
  };

  return (
    <Box>
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Typography variant="h4">Admin</Typography>
        <Typography variant="body1">
          StreamId: <i>{streamId}</i>
        </Typography>
      </Box>

      <Box mt={4} display={'flex'} flexDirection={'column'} gap={2} width={'300px'}>
        {socket ? (
          <StyledAlert icon={<CheckIcon fontSize="inherit" />} status="connected">
            Connected to websocket server!
          </StyledAlert>
        ) : (
          <StyledAlert icon={<CircularProgress size="20px" />} status="connecting">
            Connecting to websocket server...
          </StyledAlert>
        )}

        <TextField
          slotProps={{ inputLabel: { shrink: true } }}
          label="Bid Title"
          size="small"
          value={formData.itemName}
          onChange={(e) => handleInput(e, 'itemName')}
        />

        <FormControl size="small">
          <InputLabel htmlFor="outlined-adornment-amount">Bid duration in seconds</InputLabel>
          <OutlinedInput
            onChange={(e) => handleInput(e, 'bidDuration')}
            value={formData.bidDuration}
            label="Bid duration in seconds"
            type="number"
          />
        </FormControl>

        <FormControl size="small">
          <InputLabel>Starting Bid</InputLabel>
          <OutlinedInput
            onChange={(e) => handleInput(e, 'startingBid')}
            value={formData.startingBid}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Starting Bid"
            type="number"
          />
        </FormControl>

        <Button onClick={startBid} disabled={!socket}>
          Start Bid
        </Button>
      </Box>
    </Box>
  );
};

export default AdminPage;
