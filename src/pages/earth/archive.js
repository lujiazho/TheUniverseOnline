import { Image } from 'antd';
import React, { useState } from 'react';

const App = () => {
    const [visible, setVisible] = useState(false);
    return (
        <>
            <center>
                <Image preview={{
                    visible: false,
                }}
                       width={350}
                       src="/earth/Iceland/1.jfif"
                       onClick={() => setVisible(true)}
                />
                <div style={{display: 'none',}}>
                    <Image.PreviewGroup
                        preview={{
                            visible,
                            onVisibleChange: (vis) => setVisible(vis),
                        }}
                    >
                        <Image src="/earth/Iceland/1.jfif" />
                        <Image src="/earth/Iceland/2.jfif" />
                        <Image src="/earth/Iceland/3.jfif" />
                        <Image src="/earth/Iceland/4.jfif" />
                        <Image src="/earth/Iceland/5.jfif" />
                        <Image src="/earth/Iceland/6.jfif" />

                    </Image.PreviewGroup>
                </div>
            </center>
        </>
    );
};

export default App;