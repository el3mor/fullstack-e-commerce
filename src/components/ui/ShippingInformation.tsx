import { Field, Fieldset, For, Input, NativeSelect, Textarea } from '@chakra-ui/react';

const ShippingInformation = () => {
  return (
    <Fieldset.Root size="lg">
      <Fieldset.Content>
        <Field.Root>
          <Field.Label>Street address</Field.Label>
          <Input name="address" />
        </Field.Root>
        <Field.Root>
          <Field.Label>Country</Field.Label>
          <NativeSelect.Root>
            <NativeSelect.Field name="country">
              <For each={['Egypt', 'Saudi Arabia', 'United Emirates']}>
                {(item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                )}
              </For>
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>
        <Field.Root>
          <Field.Label>Notes</Field.Label>
          <Textarea name="notes" />
        </Field.Root>
      </Fieldset.Content>
      <Fieldset.ErrorText>Some fields are invalid. Please check them.</Fieldset.ErrorText>
    </Fieldset.Root>
  );
};

export default ShippingInformation;
