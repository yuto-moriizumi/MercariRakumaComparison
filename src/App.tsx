import React from "react";
import {
  Container,
  Table,
  Image,
  Form,
  Col,
  Accordion,
  Button,
  Card,
} from "react-bootstrap";
import { shippings } from "./shippings";

type State = {
  service: string;
  height: number;
  g: number;
  sell: number;
};
export default class App extends React.Component<{}, State> {
  state = { service: "none", height: 0, g: 0, sell: 0 };
  private shippings = shippings;
  render() {
    const cheapest_mercari = this.findChepestShipping("mercari");
    const cheapest_rakuma = this.findChepestShipping("rakuma");

    return (
      <Container fluid="xl">
        <h1 className="mt-3 mb-3">メルカリラクマ 配送料比較表</h1>
        <Accordion className="mb-3">
          <Card>
            <Card.Header>
              <Accordion.Toggle
                as={Button}
                variant="link"
                eventKey="0"
                className="p-0"
              >
                利益比較 ▼
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <p>
                  発送サイズと出品価格に基づいて利益を計算します。「フィルター」の高さや重量の入力が必要です。
                </p>
                <Form inline className="mb-2">
                  <Form.Label className="mr-2">出品価格</Form.Label>
                  <Form.Control
                    placeholder="円単位"
                    onChange={(e) =>
                      this.setState({ sell: parseInt(e.target.value) })
                    }
                  />
                </Form>
                <p className="mb-1">
                  メルカリの場合：
                  {cheapest_mercari
                    ? cheapest_mercari.name +
                      "," +
                      Math.ceil(
                        this.state.sell * (1 - 0.1) - cheapest_mercari.cost
                      ) +
                      "円"
                    : "発送困難"}
                </p>
                <p>
                  ラクマの場合：
                  {cheapest_rakuma
                    ? cheapest_rakuma.name +
                      "," +
                      Math.ceil(
                        this.state.sell * (1 - 0.06 * 1.1) -
                          cheapest_rakuma.cost
                      ) +
                      "円"
                    : "発送困難"}
                </p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
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
            <Col>高さで絞る</Col>
            <Col>
              <Form.Control
                placeholder="cm単位"
                onChange={(e) => {
                  this.setState({ height: parseInt(e.target.value) });
                }}
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>重量で絞る</Col>
            <Col>
              <Form.Control
                placeholder="g単位"
                onChange={(e) => {
                  this.setState({ g: parseInt(e.target.value) });
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
                  isNaN(this.state.height) ||
                  shipping.maxHeight >= this.state.height;
                const pass_g =
                  isNaN(this.state.g) || shipping.g >= this.state.g;
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

  private findChepestShipping(service: string) {
    const allowed_shippings = this.shippings.filter((shipping) => {
      //条件で配送方法をフィルターする
      const pass_service =
        (service === "mercari" && shipping.isAvailable4Mercari) ||
        (service === "rakuma" && shipping.isAvailable4Rakuma);
      const pass_height =
        isNaN(this.state.height) || shipping.maxHeight >= this.state.height;
      const pass_g = isNaN(this.state.g) || shipping.g >= this.state.g;
      return pass_service && pass_height && pass_g;
    });
    if (allowed_shippings.length === 0) return null;
    return allowed_shippings[0];
  }
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
