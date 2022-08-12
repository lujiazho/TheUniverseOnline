import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { LaptopOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import logo from '../assets/logo.jpg';

const { Header, Footer, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

class BasicLayout extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            collapsed: false,
        }
    }

    render() {
        return (
            <Layout>
                <Sider width={256} style={{minHeight: '100vh', color: 'white'}}>
                    <div style={{height: '32px', margin: '16px'}}>
                        <img src={logo} style={{height: '32px'}}/>
                    </div>
                    <Menu defaultSelectedKeys={[]}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        theme="dark"
                        inlineCollapsed={this.state.collapsed}>

                        <SubMenu key="sub1" title={<span><LaptopOutlined /><span>The Earth</span></span>}>
                            <Menu.Item key="1"><Link to="/earth/explore">Explore</Link></Menu.Item>
                            <Menu.Item key="2"><Link to="/earth/archive">Archive</Link></Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout>
                    {/*<Header style={{ background: '#fff', textAlign: 'center', padding: 0 }}>Header</Header>*/}
                    <Content style={{ margin: '24px 16px 0' }}>
                        <div style={{ padding: 24, background: '#fff',
                            minHeight: 360 }}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>The Universe Online ©2022
                        Created by <a href="https://lujiazho.github.io/">Lujia Zhong</a>
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}

export default BasicLayout;