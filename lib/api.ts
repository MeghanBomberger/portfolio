export const baseURL = '/api';

export const getProjects = () =>
  fetch(`${baseURL}/projects`).then(res => res.json())

export const getSkills = () =>
  fetch(`${baseURL}/skills`).then(res => res.json())
