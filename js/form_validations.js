$("#formulario_de_contacto").validate({
  rules: {
    name: "required",
    email: {
      required: true,
      email: true
    },
    subject: "required",
    message: "required"
  }
});