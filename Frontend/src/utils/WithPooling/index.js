import React from "react";

const withPooling = (WrappedComponent) => {
  class HOC extends React.Component {
    tick = () => {
      this.child && this.child.tick && this.child.tick();
    };

    render() {
      for (let i = 0; i < 1000; i++)
        setTimeout(() => {
          this.tick();
        }, i * 100);

      return <WrappedComponent ref={(r) => (this.child = r)} />;
    }
  }

  return HOC;
};

export default withPooling;
