let notes = JSON.parse(localStorage.getItem("notes")) || [];

function addNote() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;
  if (!title || !content) return;

  notes.push({ id: Date.now(), title, content });
  localStorage.setItem("notes", JSON.stringify(notes));

  document.getElementById("title").value = "";
  document.getElementById("content").value = "";

  render();
}

function deleteNote(id) {
  notes = notes.filter(n => n.id !== id);
  localStorage.setItem("notes", JSON.stringify(notes));
  render();
}

function render() {
  const search = document.getElementById("search").value.toLowerCase();
  const container = document.getElementById("notes");
  container.innerHTML = "";

  notes
    .filter(n =>
      n.title.toLowerCase().includes(search) ||
      n.content.toLowerCase().includes(search)
    )
    .forEach(n => {
      container.innerHTML += `
        <div class="note">
          <h3>${n.title}</h3>
          <p>${n.content}</p>
          <button onclick="deleteNote(${n.id})">Delete</button>
        </div>
      `;
    });
}

render();
