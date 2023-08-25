import FlexContainer from '../../containers/FlexContainer';

interface UserContactInfoProps {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string;
}

export default function UserContactInfo({ firstName, lastName, email }: UserContactInfoProps) {
  return (
    <FlexContainer style={{ flexDirection: 'column' }}>
      <h4>Contact Information</h4>
      <div>
        <p>
          {firstName} {lastName}
        </p>
        <p>{email}</p>
      </div>
    </FlexContainer>
  );
}
