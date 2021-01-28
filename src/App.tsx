import React from "react";
import { Container, Table, Image, Form, Col } from "react-bootstrap";

type Shipping = {
  name: string;
  size: string;
  maxHeight: number;
  g: number;
  cost: number;
  isAnonymous: boolean;
  isAvailable4Mercari: boolean;
  isAvailable4Rakuma: boolean;
};
type State = {
  service: string;
  maxHeight: number;
  maxG: number;
};
export default class App extends React.Component<{}, State> {
  state = { service: "none", maxHeight: 999, maxG: 9999 };
  render() {
    return (
      <Container fluid="xl">
        <h1 className="mt-3 mb-3">メルカリラクマ 配送料比較表</h1>
        <Form className="mb-3">
          <h2>フィルター</h2>
          <Form.Row className="mb-2">
            <Col>サービス</Col>
            <Col>
              <Form.Check
                name="service"
                type="radio"
                inline
                label={
                  <>
                    <MercariIcon valid />
                    メルカリ
                  </>
                }
                onClick={(e) => this.setState({ service: "mercari" })}
              />
            </Col>
            <Col>
              <Form.Check
                name="service"
                type="radio"
                inline
                label={
                  <>
                    <RakumaIcon valid />
                    ラクマ
                  </>
                }
                onClick={(e) => this.setState({ service: "rakuma" })}
              />
            </Col>
          </Form.Row>
          <Form.Row className="mb-2">
            <Col>最大高さで絞る</Col>
            <Col>
              <Form.Control
                placeholder="cm単位"
                onChange={(e) => {
                  this.setState({ maxHeight: parseInt(e.target.value) });
                }}
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>最大重量で絞る</Col>
            <Col>
              <Form.Control
                placeholder="g単位"
                onChange={(e) => {
                  this.setState({ maxG: parseInt(e.target.value) });
                }}
              />
            </Col>
          </Form.Row>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>配送種類</th>
              <th>梱包サイズ</th>
              <th>高さ制限</th>
              <th>重量制限</th>
              <th>送料</th>
              <th>匿名か?</th>
            </tr>
          </thead>
          <tbody>
            {this.shippings
              .filter((shipping) => {
                //条件で配送方法をフィルターする
                const pass_service =
                  this.state.service === "none" ||
                  (this.state.service === "mercari" &&
                    shipping.isAvailable4Mercari) ||
                  (this.state.service === "rakuma" &&
                    shipping.isAvailable4Rakuma);
                const pass_height =
                  isNaN(this.state.maxHeight) ||
                  shipping.maxHeight <= this.state.maxHeight;
                const pass_g =
                  isNaN(this.state.maxG) || shipping.g <= this.state.maxG;
                return pass_service && pass_height && pass_g;
              })
              .map((shipping, index) => (
                <tr key={index}>
                  <td>
                    <MercariIcon valid={shipping.isAvailable4Mercari} />
                    <RakumaIcon valid={shipping.isAvailable4Rakuma} />
                    {shipping.name}
                  </td>
                  <td>{shipping.size}</td>
                  <td className="text-right">{shipping.maxHeight} cm</td>
                  <td className="text-right">{shipping.g} g</td>
                  <td className="text-right">{shipping.cost} 円</td>
                  <td>{shipping.isAnonymous ? "匿名" : "記名"}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Container>
    );
  }

  private shippings: Shipping[] = [
    {
      name: "ミニレター",
      size: "郵便書簡",
      maxHeight: 1,
      g: 25,
      cost: 62,
      isAnonymous: false,
      isAvailable4Mercari: true,
      isAvailable4Rakuma: true,
    },
    {
      name: "定型郵便",
      size: "縦23.5×横12",
      maxHeight: 1,
      g: 25,
      cost: 82,
      isAnonymous: false,
      isAvailable4Mercari: true,
      isAvailable4Rakuma: true,
    },
    {
      name: "定型郵便",
      size: "縦23.5×横12",
      maxHeight: 1,
      g: 50,
      cost: 92,
      isAnonymous: false,
      isAvailable4Mercari: true,
      isAvailable4Rakuma: true,
    },
    {
      name: "定型外郵便：規格内",
      size: "縦34×横25",
      maxHeight: 3,
      g: 50,
      cost: 120,
      isAnonymous: false,
      isAvailable4Mercari: true,
      isAvailable4Rakuma: true,
    },
    {
      name: "定型外郵便：規格内",
      size: "縦34×横25",
      maxHeight: 3,
      g: 100,
      cost: 140,
      isAnonymous: false,
      isAvailable4Mercari: true,
      isAvailable4Rakuma: true,
    },
    {
      name: "らくらくメルカリ便 ネコポス",
      size: "31.2×22.8cm以内",
      maxHeight: 3,
      g: 1000,
      cost: 175,
      isAnonymous: true,
      isAvailable4Mercari: true,
      isAvailable4Rakuma: false,
    },
    {
      name: "ゆうメール",
      size: "34×25cm以内",
      maxHeight: 3,
      g: 150,
      cost: 180,
      isAnonymous: false,
      isAvailable4Mercari: true,
      isAvailable4Rakuma: true,
    },
    {
      name: "かんたんラクマパック ネコポス",
      size: "31.2×22.8cm以内",
      maxHeight: 3,
      g: 1000,
      cost: 200,
      isAnonymous: true,
      isAvailable4Mercari: false,
      isAvailable4Rakuma: true,
    },
    {
      name: "ゆうゆうメルカリ便 ゆうパケット",
      size: "3辺合計 60cm以内 長辺34cm",
      maxHeight: 3,
      g: 1000,
      cost: 200,
      isAnonymous: true,
      isAvailable4Mercari: true,
      isAvailable4Rakuma: false,
    },
    {
      name: "定型外郵便：規格外",
      size: "３辺合計90㎝以内・長辺60cm以内",
      maxHeight: 60,
      g: 50,
      cost: 200,
      isAnonymous: false,
      isAvailable4Mercari: true,
      isAvailable4Rakuma: true,
    },
    {
      name: "定型外郵便：規格内",
      size: "縦34×横25",
      maxHeight: 3,
      g: 150,
      cost: 205,
      isAnonymous: false,
      isAvailable4Mercari: true,
      isAvailable4Rakuma: true,
    },
    {
      name: "ゆうメール",
      size: "34×25cm以内",
      maxHeight: 3,
      g: 250,
      cost: 215,
      isAnonymous: false,
      isAvailable4Mercari: true,
      isAvailable4Rakuma: true,
    },
    {
      name: "定型外郵便：規格外",
      size: "３辺合計90㎝以内",
      maxHeight: 60,
      g: 100,
      cost: 220,
      isAnonymous: false,
      isAvailable4Mercari: true,
      isAvailable4Rakuma: true,
    },
    {
      name: "ゆうパケット",
      size: "３辺合計60cm以内",
      maxHeight: 1,
      g: 1000,
      cost: 250,
      isAnonymous: true,
      isAvailable4Mercari: true,
      isAvailable4Rakuma: true,
    },
    {
      name: "定型外郵便：規格内",
      size: "縦34×横25",
      maxHeight: 3,
      g: 250,
      cost: 250,
      isAnonymous: false,
      isAvailable4Mercari: true,
      isAvailable4Rakuma: true,
    },
    {
      name: "定型外郵便：規格外",
      size: "３辺合計90㎝以内",
      maxHeight: 60,
      g: 150,
      cost: 290,
      isAnonymous: false,
      isAvailable4Mercari: true,
      isAvailable4Rakuma: true,
    },
    {
      name: "ゆうメール",
      size: "34×25cm以内",
      maxHeight: 3,
      g: 500,
      cost: 300,
      isAnonymous: false,
      isAvailable4Mercari: true,
      isAvailable4Rakuma: true,
    },
    {
      name: "ゆうパケット",
      size: "３辺合計60cm以内",
      maxHeight: 2,
      g: 1000,
      cost: 310,
      isAnonymous: true,
      isAvailable4Mercari: true,
      isAvailable4Rakuma: true,
    },
    {
      name: "定型外郵便：規格外",
      size: "３辺合計90㎝以内",
      maxHeight: 60,
      g: 250,
      cost: 340,
      isAnonymous: false,
      isAvailable4Mercari: true,
      isAvailable4Rakuma: true,
    },
    {
      name: "ゆうメール",
      size: "34×25cm以内",
      maxHeight: 3,
      g: 1000,
      cost: 350,
      isAnonymous: false,
      isAvailable4Mercari: true,
      isAvailable4Rakuma: true,
    },
    {
      name: "ゆうパケット",
      size: "３辺合計60cm以内",
      maxHeight: 3,
      g: 1000,
      cost: 360,
      isAnonymous: true,
      isAvailable4Mercari: true,
      isAvailable4Rakuma: true,
    },
    {
      name: "レターパックライト",
      size: "34×24.8cm",
      maxHeight: 3,
      g: 4000,
      cost: 360,
      isAnonymous: true,
      isAvailable4Mercari: true,
      isAvailable4Rakuma: true,
    },
    {
      name: "定型外郵便：規格内",
      size: "縦34×横25",
      maxHeight: 3,
      g: 500,
      cost: 380,
      isAnonymous: false,
      isAvailable4Mercari: true,
      isAvailable4Rakuma: true,
    },
    {
      name: "ゆうゆうメルカリ便 ゆうパケットプラス",
      size: "24×17cm以内",
      maxHeight: 7,
      g: 2000,
      cost: 440,
      isAnonymous: true,
      isAvailable4Mercari: true,
      isAvailable4Rakuma: false,
    },
    {
      name: "らくらくメルカリ便 宅急便コンパクト",
      size: "縦25×横20",
      maxHeight: 5,
      g: 9999,
      cost: 450,
      isAnonymous: true,
      isAvailable4Mercari: true,
      isAvailable4Rakuma: false,
    },
    {
      name: "定型外郵便：規格外",
      size: "３辺合計90㎝以内",
      maxHeight: 60,
      g: 500,
      cost: 500,
      isAnonymous: false,
      isAvailable4Mercari: true,
      isAvailable4Rakuma: true,
    },
    {
      name: "レターパックプラス",
      size: "34×24.8cm・厚さは入ればOK",
      maxHeight: 20,
      g: 4000,
      cost: 510,
      isAnonymous: false,
      isAvailable4Mercari: true,
      isAvailable4Rakuma: true,
    },
    {
      name: "かんたんラクマパック 宅急便コンパクト",
      size: "縦25×横20",
      maxHeight: 5,
      g: 9999,
      cost: 600,
      isAnonymous: true,
      isAvailable4Mercari: false,
      isAvailable4Rakuma: true,
    },
  ];
}

type Prop = {
  valid: boolean;
};
class MercariIcon extends React.Component<Prop, {}> {
  render() {
    return (
      <Image
        src={this.props.valid ? "mercari.png" : "mercari_gray.png"}
        height="32"
      />
    );
  }
}

class RakumaIcon extends React.Component<Prop, {}> {
  render() {
    return (
      <Image
        src={this.props.valid ? "rakuma.png" : "rakuma_gray.png"}
        height="32"
      />
    );
  }
}
