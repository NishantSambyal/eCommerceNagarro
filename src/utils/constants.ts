const STATUS_DATA = [
  { id: 1, status: 'Ordered' },
  { id: 2, status: 'Shipped' },
  { id: 3, status: 'Out for Delivery' },
  { id: 4, status: 'Delivered' },
];

const availableStates = [
  'Delhi',
  'Haryana',
  'Punjab',
  'Rajasthan',
  'Maharashtra',
];

const transformStates = () => {
  return availableStates.map(state => ({
    label: state,
    value: state,
  }));
};

export { STATUS_DATA, availableStates, transformStates };
