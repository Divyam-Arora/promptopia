"use client";

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function UserProfile() {
  const { id } = useParams();
  const name = useSearchParams().get("name");
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user.id == id) {
      router.replace("/profile");
    }
    const getPosts = async () => {
      const response = await fetch(`/api/users/${id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    getPosts();
  }, []);
  return (
    <Profile
      name={name}
      desc={`Welcome to ${name}'s profile page`}
      data={posts}
    />
  );
}

export default UserProfile;
