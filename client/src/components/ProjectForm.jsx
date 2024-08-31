import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PROJECT, GET_PROJECTS } from "../graphql/projects.js";

export const ProjectForm = () => {
  const [project, setProject] = useState({
    name: "",
    description: "",
  });

  const [createProject, { loading, error }] = useMutation(CREATE_PROJECT, {
    refetchQueries: [
      {
        query: GET_PROJECTS,
      },
      "GetProject",
    ],
  });

  const handleChange = ({ target: { name, value } }) =>
    setProject({
      ...project,
      [name]: value,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    createProject({
      variables: {
        name: project.name,
        description: project.description,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error.message}</p>}
      <input
        type="text"
        name="name"
        onChange={handleChange}
        placeholder="Write a name"
      />
      <textarea
        name="description"
        rows="3"
        onChange={handleChange}
        placeholder="Write a description"
      ></textarea>
      <button disabled={!project.name || !project.description || loading}>
        Save
      </button>
    </form>
  );
};
