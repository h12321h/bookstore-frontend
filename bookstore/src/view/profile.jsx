import {UploadOutlined} from '@ant-design/icons';
import {message,Button, ConfigProvider, Upload, Flex, Image, Input, Form,notification} from 'antd';
import Navbar from "../components/Navbar";
import BackButton from "../components/BackButton";
import {useEffect, useState} from "react";
import {getUser,updateUser} from "../service/user";
import {getBooks} from "../service/book";
import {getCookie} from "../service/cookie";

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

const {TextArea} = Input;

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};
export default function ProfilePage() {
    const [loading, setLoading] = useState(false);
    const [person,setPerson] = useState({});
    const [tempPerson, setTempPerson] = useState({});

    const initPerson =async () => {
        const data = await getUser(getCookie());
        setPerson(data);
        setTempPerson(data);
    }

    useEffect(() => {
        initPerson();
    }, []);

    const handleSave = () => {//处理保存按钮
        setPerson(tempPerson);
        updateUser(tempPerson).then(data => {
            //console.log(data);
            if (data === "success") {
                notification.success({
                    message: '保存成功',
                    description: '个人信息已保存'
                });
            } else {
                notification.error({
                    message: '保存失败',
                    description: '请重试'
                });
                setTempPerson(person);
            }
        });
    }

    const handleCancel = () => {//处理取消按钮
        setTempPerson(person);
    }

    const handleChange = ({ file }) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const base64Image = e.target.result;
            setTempPerson({...tempPerson, avatar: base64Image});
            //setTempImage(base64Image);
        };
        reader.readAsDataURL(file);
        return false;
    };

    return (
        <div>
            <div className="absolute w-full top-24 px-16 bg-gray-100">
                <BackButton/>
                <div className="absolute ml-56 mt-28">
                    <p className="text-4xl">个人信息</p>
                </div>
                <Flex className="mt-28">
                    <Flex vertical align="center" gap="large" className="ml-56 m-8 mt-20">
                        <Image
                            width={300}
                            height={300}
                            src={tempPerson.avatar}
                        />
                        <Upload name="avatar"
                                className="avatar-uploader"
                                showUploadList={false}
                                beforeUpload={() => false}
                                onChange={handleChange}
                                accept=".jpg,.jpeg,.png"
                        >

                            <Button icon={<UploadOutlined/>} size="large" type="default">修改头像</Button>
                        </Upload>
                    </Flex>
                    <Flex vertical gap="large" labelFontSize="20" className="ml-36 mt-8">
                        <ConfigProvider
                            theme={{
                                components: {
                                    Form: {
                                        labelColor: 'rgba(0, 0, 0, 0.6)',
                                        labelFontSize: '18px',
                                    },
                                    Input: {
                                        inputFontSize: '16px',
                                    },
                                    Button: {
                                        defaultBorderColor: '#0958d9',
                                        defaultColor: '#0958d9',
                                        defaultHoverBg: '#0958d9',
                                        defaultHoverColor: '#ffffff',
                                        defaultActiveBg: '#0958d9',
                                        defaultActiveColor: '#ffffff',

                                    },
                                },
                            }}>
                            <Form layout="vertical"
                                  labelCol={{span: 10}}  // 设置标签的宽度占 8 个格
                                  wrapperCol={{span: 30}}>
                                <Form.Item label="昵称">
                                    <Input style={{width: 350}} value={tempPerson.username} size="large"
                                           onChange={e => setTempPerson({...tempPerson, username: e.target.value})}/>
                                </Form.Item>

                                <Form.Item label="联系方式">
                                    <Input style={{width: 350}} value={tempPerson.contact} size="large"
                                           onChange={e => setTempPerson({...tempPerson, contact: e.target.value})}/>
                                </Form.Item>

                                <Form.Item label="个人简介">
                                    <TextArea
                                        showCount
                                        maxLength={100}
                                        value={tempPerson.introduction}
                                        style={{
                                            width: 350,
                                            height: 100,
                                            resize: 'none',
                                        }}
                                        onChange={e => setTempPerson({
                                            ...tempPerson,
                                            introduction: e.target.value,
                                        })}
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Button className="" size="large" onClick={handleSave}>保存</Button>
                                    <Button type="default" size="large" className="ml-8"
                                            onClick={handleCancel}>取消</Button>
                                </Form.Item>
                            </Form>
                        </ConfigProvider>


                    </Flex>
                </Flex>

                <div className="w-full h-20 bg-gray-100"></div>

            </div>
        </div>
    )
}