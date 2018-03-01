// high order components folder
// functional component, so it receives props
// the only output is the props.children, which refers to the elements you store inside of <Aux></Aux>
// You do this so you don't need to wrap everything inside a parent element like a div but instead use Aux everywhere
// a new way of writing is <> </> instead of the aux. 
const Aux = (props) => props.children;

export default Aux;
