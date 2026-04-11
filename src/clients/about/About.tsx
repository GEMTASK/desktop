import { Text, View } from "onyx-ui";

const linkStyle = {
  color: "var(--primary-color)",
};

function About() {
  return (
    <View flex padding="16px" spacing="24px" align="middle center" fillColor="panel">
      <View spacing="12px" align="middle center">
        <Text fontSize="24px">
          React Desktop
        </Text>
        <Text light fontSize="12px">
          2022 – 2026 Mike Austin
        </Text>
      </View>
      <Text innerStyle={{ textAlign: "center" }}>
        A React-based desktop environment, component library,<br />
        and integrated programming language
      </Text>
      <View wrap horizontal spacing="12px">
        <Text as="a" href="https://react.dev" target="_blank" textColor="primary" style={linkStyle}>react</Text>
        <Text as="a" href="https://github.com/GEMTASK/onyx-ui" target="_blank" textColor="primary" style={linkStyle}>lucide-react</Text>
        <Text as="a" href="https://github.com/GEMTASK/onyx-ui" target="_blank" textColor="primary" style={linkStyle}>onyx-ui</Text>
        <Text as="a" href="https://github.com/GEMTASK/onyx-ui" target="_blank" textColor="primary" style={linkStyle}>kopi-language</Text>
      </View>
    </View>
  );
}

export default About;
