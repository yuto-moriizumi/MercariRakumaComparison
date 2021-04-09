import React from 'react';
import {
  Container,
  Table,
  Form,
  Col,
  Accordion,
  Button,
  Card,
} from 'react-bootstrap';
import MercariIcon from './MercariIcon';
import RakumaIcon from './RakumaIcon';
import { shippings } from './shippings';

type State = {
  service: string;
  height: number;
  g: number;
  sell: number;
  merukari_select: number;
  rakuma_select: number;
};
export default class App extends React.Component<{}, State> {
  private shippings = shippings.map((shipping, index) =>
    // 配送方法の配列にインデックスを埋め込む
    ({ index, ...shipping })
  );

  constructor(props: any) {
    super(props);
    this.state = {
      service: 'none',
      height: 0,
      g: 0,
      sell: 0,
      merukari_select: -1,
      rakuma_select: -1,
    };
  }

  private findChepestShipping(service: string) {
    const { height, g } = this.state;
    const allowed_shippings = this.shippings.filter((shipping) => {
      // 条件で配送方法をフィルターする
      const pass_service =
        (service === 'mercari' && shipping.isAvailable4Mercari) ||
        (service === 'rakuma' && shipping.isAvailable4Rakuma);
      const pass_height = Number.isNaN(height) || shipping.maxHeight >= height;
      const pass_g = Number.isNaN(g) || shipping.g >= g;
      return pass_service && pass_height && pass_g;
    });
    if (allowed_shippings.length === 0) return null;
    return allowed_shippings[0];
  }

  render() {
    const {
      merukari_select,
      sell,
      rakuma_select,
      service,
      height,
      g,
    } = this.state;
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
                      this.setState({
                        sell: parseInt(e.target.value, 10),
                      })
                    }
                  />
                </Form>
                <p className="mb-1">
                  メルカリの場合：
                  {merukari_select !== -1
                    ? `${shippings[merukari_select].name},${Math.ceil(
                        sell * (1 - 0.1) - shippings[merukari_select].cost
                      )}円`
                    : '配送方法を選択してください'}
                </p>
                <p>
                  ラクマの場合：
                  {rakuma_select !== -1
                    ? `${shippings[rakuma_select].name},${Math.ceil(
                        sell * (1 - 0.06 * 1.1) - shippings[rakuma_select].cost
                      )}円`
                    : '配送方法を選択してください'}
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
                onClick={() => this.setState({ service: 'none' })}
                checked={service === 'none'}
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
                onClick={() => this.setState({ service: 'mercari' })}
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
                onClick={() => this.setState({ service: 'rakuma' })}
              />
            </Col>
          </Form.Row>
          <Form.Row className="mb-2">
            <Col>高さで絞る</Col>
            <Col>
              <Form.Control
                placeholder="cm単位"
                onChange={(e) => {
                  this.setState({
                    height: parseInt(e.target.value, 10),
                  });
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
                  this.setState({
                    g: parseInt(e.target.value, 10),
                  });
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
                // 条件で配送方法をフィルターする
                const pass_service =
                  service === 'none' ||
                  (service === 'mercari' && shipping.isAvailable4Mercari) ||
                  (service === 'rakuma' && shipping.isAvailable4Rakuma);
                const pass_height =
                  Number.isNaN(height) || shipping.maxHeight >= height;
                const pass_g = Number.isNaN(g) || shipping.g >= g;
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
                  <td>{shipping.isAnonymous ? '匿名' : '記名'}</td>
                  <td className="text-center">
                    <Form.Check
                      name="merucari_select"
                      type="radio"
                      inline
                      disabled={!shipping.isAvailable4Mercari}
                      onClick={() =>
                        this.setState({
                          merukari_select: shipping.index,
                        })
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
                      onClick={() =>
                        this.setState({
                          rakuma_select: shipping.index,
                        })
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
}
