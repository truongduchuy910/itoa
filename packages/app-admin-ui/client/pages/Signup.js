/** @jsx jsx */

import { useState } from 'react';
import { jsx } from '@emotion/core';

import { Alert } from '@arch-ui/alert';
import { LoadingButton } from '@arch-ui/button';
import { Input } from '@arch-ui/input';
import { colors, gridSize } from '@arch-ui/theme';
import { PageTitle, Title } from '@arch-ui/typography';

import { gql, useMutation } from '@apollo/client';

import { upcase } from '@itoa/utils';

import ItoaLogo from '../components/ItoaLogo';

import { useAdminMeta } from '../providers/AdminMeta';
import { useUIHooks } from '../providers/Hooks';

import { AUTH_MUTATION } from './Signin';
const _PADDING = gridSize * 2;
const _BUTTON_WIDTH = 280;

const Container = props => (
  <div
    css={{
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minHeight: '100vh',
      width: '100%',
    }}
    {...props}
  />
);

const Alerts = props => <div css={{ height: '48px' }} {...props} />;

const Form = props => (
  <form
    css={{
      marginBottom: '120px',
      minWidth: '650px',
      padding: '40px',
      display: 'flex',
      flexWrap: 'nowrap',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    {...props}
  />
);

const Divider = props => (
  <div
    css={{
      borderRight: `2px solid ${colors.N10}`,
      minHeight: '450px',
      lineHeight: '450px',
      marginRight: '40px',
      marginLeft: '60px',
    }}
    {...props}
  />
);

const FieldLabel = props => (
  <div
    css={{
      color: `${colors.N60}`,
      marginTop: `${_PADDING}px`,
      marginBottom: `${gridSize}px`,
      fontSize: `${_PADDING}px`,
    }}
    {...props}
  />
);

const Fields = props => (
  <div css={{ margin: `${_PADDING}px 0`, width: `${_BUTTON_WIDTH}px` }} {...props} />
);

const SignupPage = () => {
  const {
    name: siteName,
    authService: {
      gqlNames: { authenticateMutationName },
      identityField,
      secretField,
      uri: authUri,
    },
  } = useAdminMeta();
  const authClient = useMemo(() => initApolloClient({ uri: authUri }), []);
  const { logo: getCustomLogo } = useUIHooks();

  const [identity, setIdentity] = useState('');
  const [secret, setSecret] = useState('');
  const [confirm, setConfirm] = useState('');
  const [reloading, setReloading] = useState(false);

  const SIGNUP_MUTATION = ({ identityField, secretField }) => gql`
    mutation signup($identity: String, $secret: String) {
      createUser(data: {${identityField}: $identity, ${secretField}: $secret}) {
        id
      }
    }
  `;

  const onCompleted = async () => {
    // Flag so the 'Submit' button doesn't temporarily flash as available while reloading the page.
    setReloading(true);
    // Ensure there's no old unauthenticated data hanging around
    await client.clearStore();
  };
  const [signin] = useMutation(
    AUTH_MUTATION({ authenticateMutationName, identityField, secretField }),
    {
      variables: { identity, secret },
      onCompleted,
      onError: () => {}, // Remove once a bad password no longer throws an error
    }
  );

  const [signup, { error, loading, client }] = useMutation(
    SIGNUP_MUTATION({ identityField, secretField }),
    {
      variables: { identity, secret },
      onCompleted,
      onError: () => {}, // Remove once a bad password no longer throws an error
      client: authClient,
    }
  );

  const onSubmit = e => {
    e.preventDefault();

    if (!loading && confirm === secret) {
      signup().then(({ data }) => {
        if (data) {
          signin().then(() => {
            window.location.replace('/admin');
          });
        }
      });
    }
  };

  return (
    <Container>
      <Alerts>
        {confirm !== secret && <Alert>M???t kh???u nh???p l???i kh??ng kh???p</Alert>}
        {error && (
          <Alert appearance="danger">
            {error?.graphQLErrors?.map(error => {
              if (error.message.slice(0, 6) === 'E11000') {
                return 'T??n ????ng nh???p ???? ???????c s??? d???ng, vui l??ng ch???n t??n kh??c.';
              }
              if (error.message.slice(0, 6) === '[passw') {
                return 'Vui l??ng ch???n m???t kh???u kh??c. V???i ??t nh???t 8 k?? t???.';
              }

              return JSON.stringify(error);
            })}
          </Alert>
        )}
      </Alerts>
      <Form method="post" onSubmit={onSubmit}>
        {getCustomLogo ? getCustomLogo() : <ItoaLogo />}
        <Divider />
        <div>
          <PageTitle css={{ marginTop: 0, marginBottom: `${gridSize}px` }}>{siteName}</PageTitle>
          <Title css={{ marginBottom: `${_PADDING * 2}px` }}>????ng k?? t??i kho???n</Title>
          <Fields>
            <FieldLabel>{upcase(identityField)}</FieldLabel>
            <Input
              name="identity"
              autoComplete="username"
              autoFocus
              value={identity}
              onChange={e => setIdentity(e.target.value)}
            />
            <FieldLabel>M???t kh???u</FieldLabel>
            <Input
              type="password"
              name="secret"
              autoComplete="current-password"
              value={secret}
              onChange={e => setSecret(e.target.value)}
            />
            <FieldLabel>Nh???p l???i m???t kh???u</FieldLabel>
            <Input
              type="password"
              name="secret"
              autoComplete="current-password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
            />
          </Fields>
          <LoadingButton
            appearance="primary"
            type="submit"
            isLoading={loading || reloading}
            indicatorVariant="dots"
            css={{
              width: `${_BUTTON_WIDTH}px`,
              height: '2.6em',
              margin: `${_PADDING}px 0`,
            }}
          >
            ????ng k??
          </LoadingButton>
          <br />
          <a href="/admin/signin">????ng nh???p</a>
        </div>
      </Form>
    </Container>
  );
};

export default SignupPage;
