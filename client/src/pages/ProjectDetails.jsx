import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROJECT, DELETE_PROJECT } from "../graphql/projects.js";
import { TasksList } from "../components/tasks/TasksList.jsx";
import { TaskForm } from "../components/tasks/TaskForm.jsx";
import { useNavigate } from "react-router-dom";

export const ProjectDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_PROJECT, {
    variables: {
      id: params.id,
    },
    skip: !params.id,
  });
  const [deleteProject, { loading: deleting, error: deleteError }] =
    useMutation(DELETE_PROJECT, {
      refetchQueries: ["getProjects"],
    });

  const handleDelete = async () => {
    const result = await deleteProject({
      variables: {
        id: params.id,
      },
    });
    if (result.data.deleteProject._id) {
      navigate("/projects");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>¡Error!</p>;

  return (
    <div className="w-2/5">
      {deleteError && (
        <p className="bg-red-500 p-2 mb-2 text-center">{deleteError.message}</p>
      )}
      <div className="bg-zinc-900 mb-2 p-10 flex justify-between">
        <div>
          <h1>{data.project.name}</h1>
          <p>{data.project.description}</p>
        </div>
        <div>
          <button
            onClick={handleDelete}
            className="bg-red-500 rounded-lg px-3 py-2"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
      <TaskForm />
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">Tasks</h2>
        {/* <p>Total: 10</p> */}
      </div>
      <TasksList tasks={data.project.tasks} />
    </div>
  );
};
