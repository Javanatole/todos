FROM python:3.13
LABEL authors="anatole"

WORKDIR /app
COPY . .
RUN pip install -e .

ENTRYPOINT ["fastapi"]
CMD ["dev", "todos/todo.py", "--host", "0.0.0.0", "--port", "8000"]