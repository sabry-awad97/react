import React from "react";
import Confirm from ".ConfirmFC";

interface IState {
  confirmOpen: boolean;
  confirmMessage: string;
  confirmVisible: boolean;
  countDown: number;
}

interface IProps {}

class App extends React.Component<IProps, IState> {
  private timer: number = 0;
  private renderCount: number = 0;

  constructor(props: IProps) {
    super(props);
    this.state = {
      confirmMessage: "Please hit the confirm button",
      confirmOpen: false,
      confirmVisible: true,
      countDown: 10
    };
  }

  public static getDerivedStateFromProps(props: IProps, state: IState) {
    // console.log("getDerivedStateFromProps", { props, state });
    return null;
  }

  private handleCancelConfirmClick = () => {
    this.setState({
      confirmMessage: "Cool, carry on reading!",
      confirmOpen: false
    });
    clearInterval(this.timer);
  };

  private handleOkConfirmClick = () => {
    this.setState({
      confirmMessage: "Take a break, I'm sure you will later...",
      confirmOpen: false
    });
    clearInterval(this.timer);
  };

  private handleConfirmClick = () => {
    this.setState({ confirmOpen: true });
    clearInterval(this.timer);
  };

  private handleTimerTick = () => {
    this.setState(
      (prevState, _props) => {
        return {
          confirmMessage: `Please hit the confirm button ${prevState.countDown} secs to go`,
          countDown: prevState.countDown - 1
        };
      },
      () => {
        if (this.state.countDown <= 0) {
          clearInterval(this.timer);
          this.setState({
            confirmMessage: "Too late to confirm!",
            confirmVisible: false
          });
        }
      }
    );
  };

  public componentDidMount() {
    // console.log("componentDidMount");
    this.timer = window.setInterval(() => this.handleTimerTick(), 1000);
  }

  public componentWillUnmount() {
    clearInterval(this.timer);
  }

  public shouldComponentUpdate(nextProps: {}, nextState: IState) {
    // console.log("shouldComponentUpdate", { nextProps, nextState });
    return true;
  }

  public getSnapshotBeforeUpdate(prevProps: IProps, prevState: IState) {
    this.renderCount += 1;
    // console.log("getSnapshotBeforeUpdate", {
    //   prevProps,
    //   prevState,
    //   renderCount: this.renderCount
    // });
    return this.renderCount;
  }

  public componentDidUpdate(
    prevProps: {},
    prevState: IState,
    snapshot: number
  ) {
    // console.log("componentDidUpdate", {
    //   prevProps,
    //   prevState,
    //   snapshot,
    //   renderCount: this.renderCount
    // });
  }

  public render() {
    // console.log("render");
    return (
      <div className="App">
        <p>{this.state.confirmMessage}</p>
        {this.state.confirmVisible && (
          <button onClick={this.handleConfirmClick}>Confirm</button>
        )}
        {this.state.countDown > 0 && (
          <Confirm
            open={this.state.confirmOpen}
            title="React and TypeScript"
            content="Are you sure you want to learn React and TypeScript?"
            cancelCaption="No way"
            okCaption="Yes please!"
            onCancelClick={this.handleCancelConfirmClick}
            onOkClick={this.handleOkConfirmClick}
          />
        )}
      </div>
    );
  }
}

export default App;
