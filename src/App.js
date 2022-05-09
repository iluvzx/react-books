import './App.css';
import { Card, Rate, List, Row, Col, Image, Button, Modal } from 'antd';
import { Component } from 'react';
import axios from 'axios';
import { compare, getBookStar } from './utils';


const { Meta } = Card

class App extends Component {
  state = {
    books: [],
    isModalVisible: false
  }
  render() {
    return (
      <div className="container">
        <h1>React Book</h1>
        <Button type="primary" onClick={() => this.showModal()}>添加书籍</Button>
        <Row gutter={[16, 16]}>
          {
            this.state.books.map(book => {
              return (
                <Col span={6} key={book.id} onClick={() => alert(book.title)}>
                  <List>
                    <Card
                      hoverable
                      // style={{ width: 240 }}
                      cover={<Image src={book.cover} alt={book.title} preview={false} />}
                    >
                      <Meta title={book.title} description={"作者：" + book.author} />
                      <Rate disabled allowHalf defaultValue={getBookStar(book.hotValue)} />
                    </Card>
                  </List>
                </Col>
              )
            })
          }
        </Row>
        <Modal title="添加书籍" centered={true} cancelText={"取消"} visible={this.state.isModalVisible} onOk={() => this.handleOk()} onCancel={() => this.handleCancel()}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    )
  }
  componentDidMount() {
    axios.get("../data.json").then(res => this.setState({
      books: [...this.state.books, ...res.data.data]
    }, () => {
      this.setState({
        books: this.state.books.sort(compare("hotValue"))
      })
    }))
  }

  // 显示模态框
  showModal() {
    this.setState({
      isModalVisible: !this.state.isModalVisible
    })
  }

  // 点击ok
  handleOk() {
    this.setState({
      isModalVisible: false
    })
  }
  
  // 点击取消
  handleCancel() {
    this.setState({
      isModalVisible: false
    })
  }
}


export default App;
