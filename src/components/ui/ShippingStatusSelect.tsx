import { Portal, Select, createListCollection } from '@chakra-ui/react';
import { useState } from 'react';

interface ShippingStatusSelectProps {
  apiValue: string;
  onChange: (status: string) => void;
}

const ShippingStatusSelect = ({ apiValue, onChange }: ShippingStatusSelectProps) => {
  const [value, setValue] = useState<string[]>([apiValue]);
  return (
    <Select.Root
      collection={statuses}
      width="320px"
      value={value}
      onValueChange={(e) => {
        setValue(e.value);
        onChange(e.value[0]);
      }}
    >
      <Select.HiddenSelect />
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select status" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {statuses.items.map((status) => (
              <Select.Item item={status} key={status.value} onSelect={() => onChange(status.value)}>
                {status.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

const statuses = createListCollection({
  items: [
    { label: 'Ordered', value: 'ordered' },
    { label: 'Shipped', value: 'shipped' },
    { label: 'Delivered', value: 'delivered' },
    { label: 'Cancelled', value: 'cancelled' },
  ],
});

export default ShippingStatusSelect;
