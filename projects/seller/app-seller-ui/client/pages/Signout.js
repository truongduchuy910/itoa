/** @jsx jsx */

import { jsx } from '@emotion/core';

import { Fragment } from 'react';

import { gql, useMutation } from '@apollo/client';

import { CheckIcon } from '@primer/octicons-react';
import { Button } from '@arch-ui/button';
import { LoadingIndicator } from '@arch-ui/loading';
import Animation from '../components/Animation';
import { useAdminMeta } from '../providers/AdminMeta';

const FlexBox = props => (
  <div
    css={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    {...props}
  />
);

const Container = props => <FlexBox css={{ minHeight: '100vh' }} {...props} />;

const Caption = props => <p css={{ fontSize: '1.5em' }} {...props} />;

const SignOutPageButton = props => (
  <Button
    css={{
      width: '200px',
      height: '2.6em',
      marginBottom: '0.8em',
      lineHeight: 'unset',
    }}
    {...props}
  />
);

const SignedOutPage = () => {
  const {
    authStrategy: {
      gqlNames: { unauthenticateMutationName },
    },
    signinPath,
  } = useAdminMeta();

  const UNAUTH_MUTATION = gql`
    mutation {
      unauthenticate: ${unauthenticateMutationName} {
        success
      }
    }
  `;

  const [signOut, { loading, client, called }] = useMutation(UNAUTH_MUTATION, {
    onCompleted: async () => {
      // Ensure there's no old authenticated data hanging around
      await client.clearStore();
    },
  });

  if (!called) {
    signOut();
  }

  return (
    <Container>
      {loading ? (
        <Fragment>
          <LoadingIndicator css={{ height: '3em' }} size={12} />
          <Caption>Đăng xuất.</Caption>
        </Fragment>
      ) : (
        <Fragment>
          <Animation name="pulse" duration="500ms">
            <CheckIcon size={48} css={{ color: 'var(--color-text-success) !important' }} />
          </Animation>
          <Caption>Bạn đã đăng xuất.</Caption>
          <FlexBox>
            <SignOutPageButton variant="ghost" href={signinPath}>
              Đăng nhập
            </SignOutPageButton>
          </FlexBox>
        </Fragment>
      )}
    </Container>
  );
};

export default SignedOutPage;
