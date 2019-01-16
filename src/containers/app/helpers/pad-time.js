export default value => (value.toString().length >= 2 ? value.toString() : `00${value}`.substr(-2));
