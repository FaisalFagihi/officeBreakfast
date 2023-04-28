import React from 'react'
import { Notification, useToaster } from 'rsuite';

export default function Toaster() {
  const toaster = useToaster();

 const pushMessage = (message, type) => {
    toaster.push(<Notification type={type} header={type}  closable>
        <div>
            {message}
            </div>
    </Notification>, {placement:"bottomEnd"});
}

  return {push: pushMessage};
}



