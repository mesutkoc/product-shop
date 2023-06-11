import { Space, Spin } from 'antd';
import './table.scss';

const Loading = () => (
    <div className='loading'>
        <Space size="middle">
            <Spin tip="Loading" size="large">
                <div className="content" />
            </Spin>
        </Space>
    </div>

);

export default Loading;