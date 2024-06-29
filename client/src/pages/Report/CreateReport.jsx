import React, { useState } from "react";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";

import { Form, Input, Button, Checkbox, Upload } from "antd";
import './reportDetail.css'

function CreateReport() {
  const [reportData, setReportData] = useState("");
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    console.log(values);
    const formData = new FormData();
    formData.append("prompt", values.prompt);

    values.dragger?.forEach((file) => {
      formData.append("files", file.originFileObj);
    });

    const token = JSON.parse(localStorage.getItem("user"));

    console.log(token);

    fetch("http://localhost:3000/report/create", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setReportData(data);
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <div className="mb-1 mt-10 text-center" > 
      <h1>Create Report</h1>

      <Form
        name="validate_other"
        {...formItemLayout}
        onFinish={onFinish}
        layout="vertical"
        style={{
            textAlign: "center",
        }}

        labelCol={{
            span: 12,
            offset: 6
            
        }}
        wrapperCol={{
            span: 12,
            offset: 6
        }}
      >
        <div className="m-5 text-lg">Prompt:</div>
        <Form.Item
          name="prompt"
        //   label="Prompt"
          rules={[
            {
              required: true,
            },
          ]}
          labelCol={{
            span: 12,
            offset: 6
          }}
          
        >
          <Input.TextArea rows={6}  className="text-center"/>
        </Form.Item>
        <div className="m-5 text-lg">Image:</div>
        <Form.Item  multiple>
          <Form.Item
            name="dragger"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            noStyle
          >
            <Upload.Dragger name="files">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload.
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>

    </div>
  );
}

export default CreateReport;
