import {
  FormControl,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";

interface IInputProps extends ChakraInputProps {
  name: string;
  placeholder: string;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, IInputProps> = (
  { name, placeholder, ...rest }: IInputProps,
  ref
) => {
  return (
    <FormControl isRequired>
      <ChakraInput
        w="100%"
        p="0 1.5rem"
        h="4rem"
        borderRadius="0.25rem"
        borderColor="white.400"
        border="1px solid"
        bg="white.100"
        name={name}
        id={name}
        placeholder={placeholder}
        ref={ref}
        {...rest}
      />
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
