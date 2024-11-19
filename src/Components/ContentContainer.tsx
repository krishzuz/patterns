import DisplayContainer from "./DisplayContainer";
import FormContainer from "./FormContainer";

export default function ContentContainer() {
  return (
    <div style={{ border: "1px solid red", padding: "10px" }}>
      ContentContainer
      <div
        style={{
          padding: "1rem",
        }}
      >
        <FormContainer />
        <DisplayContainer name="name" />
        <DisplayContainer name="email" />
      </div>
    </div>
  );
}
