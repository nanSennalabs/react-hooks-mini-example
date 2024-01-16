import { TextInput } from "./TextInput";
import { withTextInput } from "./withTextInput";

const ConnectedTextInput = withTextInput(TextInput);

export { ConnectedTextInput as TextInput };
