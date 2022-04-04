import React, { FunctionComponent, useState } from 'react';

import {
  Box,
  Button,
  Card,
  Dropdown,
  FormField,
  Input,
  Layout,
  Cell,
  Page,
  Breadcrumbs,
  Heading,
  AddItem,
  IconButton,
  Text,
} from 'wix-style-react';
import DeleteSmall from 'wix-ui-icons-common/DeleteSmall';

interface AppProps {}

const App: FunctionComponent<AppProps> = () => {
  const colors = [
    { id: 0, value: 'Red' },
    { id: 1, value: 'Blue' },
    { id: 2, value: 'Green' },
    { id: 3, value: 'Yellow' },
    { id: 4, value: 'Pink' },
  ];
  const breadCrumbItems = [
    { id: '1', value: 'Root Page' },
    { id: '2', value: 'WSR Form' },
  ];

  const initialFormValues = {
    firstName: '',
    lastName: '',
    color: '',
  };

  const [formFieldValues, setFormFieldValues] = useState(initialFormValues);
  const [savedData, setSavedData] = useState(initialFormValues);
  const [selectedColorId, setSelectedColorId] = useState<number | null>(null);
  const [isSubmited, setIsSubmited] = useState(false);

  const isFieldsEmpty =
    formFieldValues.color === '' &&
    formFieldValues.firstName === '' &&
    formFieldValues.lastName === '';

  const mandatoryfieldsFilled =
    formFieldValues.firstName !== '' && formFieldValues.lastName !== '';

  return (
    <Page height="100vh" dataHook="app-page">
      <Page.Header
        title="WSR Form"
        breadcrumbs={<Breadcrumbs activeId="2" items={breadCrumbItems} />}
        actionsBar={
          <Box gap="SP2">
            <Button
              dataHook="clear-button"
              priority="secondary"
              onClick={() => {
                setFormFieldValues(initialFormValues);
                setSelectedColorId(null);
              }}
              disabled={isFieldsEmpty}
            >
              Clear
            </Button>
            <Button
              dataHook="submit-button"
              onClick={() => {
                if (mandatoryfieldsFilled) {
                  setIsSubmited(true);
                  setSavedData(formFieldValues);
                }
              }}
              disabled={!mandatoryfieldsFilled}
            >
              Submit
            </Button>
          </Box>
        }
      />
      <Page.Content>
        <Layout>
          <Cell>
            <Layout>
              <Cell span={8}>
                <Card>
                  <Card.Header title="General Info" />
                  <Card.Divider />
                  <Card.Content>
                    <Layout>
                      <Cell>
                        <Layout>
                          <Cell span={6}>
                            <FormField label="First Name" required>
                              <Input
                                dataHook="first-name-input"
                                onChange={(e) => {
                                  setFormFieldValues({
                                    ...formFieldValues,
                                    firstName: e.target.value,
                                  });
                                }}
                                value={formFieldValues.firstName}
                              />
                            </FormField>
                          </Cell>
                          <Cell span={6}>
                            <FormField label="Last Name" required>
                              <Input
                                dataHook="last-name-input"
                                onChange={(e) => {
                                  setFormFieldValues({
                                    ...formFieldValues,
                                    lastName: e.target.value,
                                  });
                                }}
                                value={formFieldValues.lastName}
                              />
                            </FormField>
                          </Cell>
                        </Layout>
                      </Cell>
                      <Cell>
                        <Layout>
                          <Cell>
                            <Heading appearance="H5">ADDITIONAL INFO</Heading>
                          </Cell>
                          <Cell>
                            <FormField label="Favorite color">
                              <Box gap="SP2" verticalAlign="middle">
                                <Box width="100%" direction="vertical">
                                  <Dropdown
                                    dataHook="color-input"
                                    selectedId={selectedColorId as number}
                                    onSelect={(colorOption) => {
                                      setFormFieldValues({
                                        ...formFieldValues,
                                        color: colorOption.value as string,
                                      });
                                      setSelectedColorId(
                                        colorOption.id as number
                                      );
                                    }}
                                    placeholder="Choose a color"
                                    options={colors}
                                    popoverProps={{
                                      appendTo: 'window',
                                    }}
                                  />
                                </Box>
                                <IconButton
                                  size="small"
                                  priority="secondary"
                                  disabled
                                >
                                  <DeleteSmall />
                                </IconButton>
                              </Box>
                            </FormField>
                          </Cell>
                        </Layout>
                      </Cell>
                      <Cell>
                        <AddItem disabled>Add New List Item</AddItem>
                      </Cell>
                    </Layout>
                  </Card.Content>
                </Card>
              </Cell>
              <Cell span={4}>
                <Layout>
                  <Cell>
                    <Card>
                      <Card.Header
                        title="Role details"
                        suffix={
                          <Button priority="secondary" size="small" disabled>
                            Edit
                          </Button>
                        }
                      />
                      <Card.Divider />
                      <Card.Content>
                        <Layout>
                          <Cell>
                            <Heading appearance="H6">OFFICIAL TITLE</Heading>
                            <Text>Keyboard annihilator</Text>
                          </Cell>
                          <Cell>
                            <Heading appearance="H6">EXPERIENCE</Heading>
                            <Text>It’s over nine thousand</Text>
                          </Cell>
                        </Layout>
                      </Card.Content>
                    </Card>
                  </Cell>
                  {isSubmited && (
                    <Cell>
                      <Card>
                        <Card.Header title="Saved data" />
                        <Card.Divider />
                        <Card.Content dataHook="submitted-data">
                          <Layout>
                            <Cell>
                              <Heading appearance="H6">FIRST NAME</Heading>
                              <Text dataHook="submitted-first-name">
                                {savedData.firstName}
                              </Text>
                            </Cell>
                            <Cell>
                              <Heading appearance="H6">LAST NAME</Heading>
                              <Text>{savedData.lastName}</Text>
                            </Cell>
                            {savedData.color && (
                              <Cell>
                                <Heading appearance="H6">
                                  FAVORITE COLOR
                                </Heading>
                                <Text>{savedData.color}</Text>
                              </Cell>
                            )}
                          </Layout>
                        </Card.Content>
                      </Card>
                    </Cell>
                  )}
                </Layout>
              </Cell>
            </Layout>
          </Cell>
        </Layout>
      </Page.Content>
    </Page>
  );
};

export default App;
