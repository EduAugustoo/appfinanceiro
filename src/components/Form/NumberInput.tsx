import {
  FormControl,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput as ChakraNumberInput,
  NumberInputField,
  NumberInputProps as ChakraNumberInputProps,
  NumberInputStepper,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";

interface INumberInputProps extends ChakraNumberInputProps {
  name: string;
}

const NumberInputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  INumberInputProps
> = ({ name, ...rest }: INumberInputProps, ref) => {
  return (
    <FormControl isRequired>
      <ChakraNumberInput
        min={0}
        name={name}
        id={name}
        inputMode="numeric"
        defaultValue={0}
        ref={ref}
        {...rest}
      >
        <NumberInputField
          w="100%"
          p="0 1.5rem"
          h="4rem"
          borderRadius="0.25rem"
          borderColor="white.400"
          border="1px solid"
          bg="white.100"
        />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </ChakraNumberInput>
    </FormControl>
  );
};

export const NumberInput = forwardRef(NumberInputBase);
