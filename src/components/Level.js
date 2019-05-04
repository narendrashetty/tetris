
class Level extends React.PureComponent {
    render() {
      return (
        <div style={{
          padding: 20,
        }}>
          <div style={{
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          background: '#1c1e22',
        }}>
            <p style={{
              color: '#fff',
              fontWeight: 'bold',
              marginBottom: 10
            }}>Next</p>
            <Next {...this.props} />
          </div>
        </div>
      );
    }
}