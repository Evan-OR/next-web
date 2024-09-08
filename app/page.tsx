import Chat from './components/Chat';
import { VideoPlayer } from './components/VideoPlayer';

export default function Home() {
    return (
        <main>
            <VideoPlayer />
            <Chat />
        </main>
    );
}
