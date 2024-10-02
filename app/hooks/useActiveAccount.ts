import { useMsal } from '@azure/msal-react';
import { EventType } from '@azure/msal-browser';
import { useEffect, useState } from 'react';

const useActiveAccount = () => {
    const { instance } = useMsal();
    const [activeAccount, setActiveAccount] = useState(() => instance.getActiveAccount());

    useEffect(() => {
        const id = instance.addEventCallback((event) => {
            if (event.eventType === EventType.ACTIVE_ACCOUNT_CHANGED) {
                setActiveAccount(instance.getActiveAccount());
            }
        });

        return () => {
            if (id) {
                instance.removeEventCallback(id);
            }
        };
    }, [instance]);

    return activeAccount;
};

export default useActiveAccount;
