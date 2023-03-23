import { GetServerSideProps } from 'next';
import prisma from '../../prisma/prisma';
import { useState } from 'react';

type UserProps = {
  id: string;
  email: string;
  name: string;
  role: string;
  ownedTickets: object[];
  submittedTickets: object[];
  project: object;
  projectId: string;
};

interface componentProps {
  users: UserProps[];
}

export default function Home({ users }: componentProps) {
  const [currentUsers, setCurrentUsers] = useState(users);
  const elements = currentUsers.map((user, index) => (
    <p key={index}>{user.name}</p>
  ));
  return (
    <>
      <header>
        <title>Bug Tracker</title>
      </header>
      <main>
        <div>{elements}</div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const users = await prisma.user.findMany();
  return {
    props: {
      users,
    },
  };
};
