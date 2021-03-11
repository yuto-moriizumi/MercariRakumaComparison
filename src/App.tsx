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
  merukari_select: number;
  rakuma_select: number;
};
export default class App extends React.Component<{}, State> {
  state = {
    service: "none",
    height: 0,
    g: 0,
    sell: 0,
    merukari_select: -1,
    rakuma_select: -1,
  };
  private shippings = shippings.map((shipping, index) => {
    //配送方法の配列にインデックスを埋め込む
    return { index: index, ...shipping };
  });
  render() {
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
                  {this.state.merukari_select !== -1
                    ? shippings[this.state.merukari_select].name +
                      "," +
                      Math.ceil(
                        this.state.sell * (1 - 0.1) -
                          shippings[this.state.merukari_select].cost
                      ) +
                      "円"
                    : "配送方法を選択してください"}
                </p>
                <p>
                  ラクマの場合：
                  {this.state.rakuma_select !== -1
                    ? shippings[this.state.rakuma_select].name +
                      "," +
                      Math.ceil(
                        this.state.sell * (1 - 0.06 * 1.1) -
                          shippings[this.state.rakuma_select].cost
                      ) +
                      "円"
                    : "配送方法を選択してください"}
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
                label="全て"
                onClick={(_) => this.setState({ service: "none" })}
                checked={this.state.service === "none"}
              />
            </Col>
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
                onClick={(_) => this.setState({ service: "mercari" })}
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
                onClick={(_) => this.setState({ service: "rakuma" })}
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
              <th>
                高さ
                <br className="d-xl-none" />
                制限
              </th>
              <th>
                重量
                <br className="d-xl-none" />
                制限
              </th>
              <th>送料</th>
              <th>匿名?</th>
              <th>
                <MercariIcon />
              </th>
              <th>
                <RakumaIcon />
              </th>
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
              .map((shipping) => (
                <tr key={shipping.index}>
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
                  <td className="text-center">
                    <Form.Check
                      name="merucari_select"
                      type="radio"
                      inline
                      disabled={!shipping.isAvailable4Mercari}
                      onClick={(_) =>
                        this.setState({ merukari_select: shipping.index })
                      }
                      className="mx-0"
                    />
                  </td>
                  <td className="text-center">
                    <Form.Check
                      name="rakuma_select"
                      type="radio"
                      inline
                      disabled={!shipping.isAvailable4Rakuma}
                      onClick={(_) =>
                        this.setState({ rakuma_select: shipping.index })
                      }
                      className="mx-0"
                    />
                  </td>
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
  valid?: boolean;
};
class MercariIcon extends React.Component<Prop, {}> {
  render() {
    return (
      <Image
        src={
          this.props.valid === undefined || this.props.valid
            ? "mercari.png"
            : "mercari_gray.png"
        }
        height="32"
      />
    );
  }
}

class RakumaIcon extends React.Component<Prop, {}> {
  render() {
    return (
      <Image
        src={
          this.props.valid === undefined || this.props.valid
            ? "rakuma.png"
            : "rakuma_gray.png"
        }
        height="32"
      />
    );
  }
}
