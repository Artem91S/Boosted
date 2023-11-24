$(document).ready(function () {
  // Завантаження опцій для міст
  $.ajax({
    url: "../files/mockDataCities.json",
    type: "GET",
    success: function (data) {
      const options = data.map(function (city) {
        return '<option value="' + city.id + '">' + city.city + "</option>";
      });
      $(".city").html(options);

      // ініціалізувати Select2 для існуючих рядків city
      $(".city").select2();

      // ініціалізувати Select2 для існуючих рядків city
      $("#realEstateTable tbody").on("focus", "tr:last .city", function () {
        $(this).select2({
          data: data.map(function (city) {
            return { id: city.id, text: city.city };
          }),
        });
      });
    },
  });

  // Завантаження опцій для типів

  $.ajax({
    url: "../files/mockDataTypes.json",
    type: "GET",
    success: function (data) {
      const options = data.map(function (type) {
        return '<option value="' + type.id + '">' + type.type + "</option>";
      });
      $(".type").html(options);

      // ініціалізувати Select2 для існуючих рядків type
      $(".type").select2();

      // ініціалізувати Select2 для існуючих рядків type
      $("#realEstateTable tbody").on("focus", "tr:last .type", function () {
        $(this).select2({
          data: data.map(function (type) {
            return { id: type.id, text: type.type };
          }),
        });
      });
    },
  });

  // Додавання нового рядка
  function addRow() {
    let newRowNumber = $("#realEstateTable tbody tr").length;
    const row =
      "<tr>" +
      '<td class="text-center ">' +
      newRowNumber +
      "</td>" +
      '<td><input type="text" class="form-control id"></td>' +
      '<td><input type="number" class="form-control price"></td>' +
      '<td><select class="form-control city" multiple="multiple"></select></td>' +
      '<td><select class="form-control type" multiple="multiple"></select></td>' +
      '<td class="w-25 flex-row gap-5"><button class="btn btn-danger deleteBtn mx-2">Delete</button><button class="btn btn-primary copyBtn">Copy</button></td>' +
      "</tr>";
    $("#realEstateTable tbody").append(row);
  }

  // Обробник натискання кнопки "Додати рядок"
  $("#addRowBtn").on("click", function () {
    addRow();
  });

  // Функція для видалення рядка
  function deleteRow(row) {
    row.remove();
    updateRowNumbers();
  }

  // Функція для генерації унікального ID
  function generateUniqueID() {
    return "ID_" + ($("#realEstateTable tbody tr").length + 1);
  }

  // Функція для оновлення номерів рядків
  function updateRowNumbers() {
    $("#realEstateTable tbody tr").each(function (index) {
      $(this)
        .find("td:first")
        .text(index + 1);
    });
  }

  // Слухач події для кнопки "Delete"
  $(document).on("click", ".deleteBtn", function () {
    const row = $(this).closest("tr");
    deleteRow(row);
  });

  // Слухач події для кнопки "Copy"
  $(document).on("click", ".copyBtn", function () {
    const row = $(this).closest("tr");
    addRow();
  });

  // Обробник натискання кнопки "SAVE"
  $("#saveAllBtn").on("click", function () {
    const ids = [];

  // Перевірка на унікальність поля ID
    $("#realEstateTable tbody tr").each(function () {
      const idValue = $(this).find(".id").val();
      if (ids.includes(idValue)) {
        alert("ID must be unique!");
        return false;
      }
      ids.push(idValue);
    });

    // Імітація зберігання на бекенді
    alert("Data saved successfully!");
  });

  $("#realEstateTable tbody").on("change", "tr:first .price", function () {
    handleColumnEditPrice("price", this);
  });

  // Обробник зміни значення в рядку ALL для міст
  $("#realEstateTable tbody").on("change", "tr:first .city", function () {
    handleColumnEdit("city", this);
  });

  // // Обробник зміни значення в рядку ALL для типу
  $("#realEstateTable tbody").on("change", "tr:first .type", function () {
    handleColumnEdit("type", this);
  });

  function handleColumnEditPrice(columnName, element) {
    // Get the value from the "ALL" row
    const value = $(element).val();

    if (value == 200000) {
      // Confirm if the user wants to edit all values in the column
      actionWithConfirmModal(columnName, value, element);
    }
  }
  function actionWithConfirmModal(columnName, value, element) {
    const confirmEdit = confirm(
      "Are you sure you want to edit all values in the " +
        columnName +
        " column?"
    );
    if (confirmEdit) {
      // Update values in each row of the column
      $("#realEstateTable tbody tr:not(:first)").each(function () {
        $(this)
          .find("." + columnName)
          .val(value);
      });
      // Clear the value in the "ALL" row
      $(element).val("");
    } else {
      // Clear the value in the "ALL" row
      $(element).val(value);
    }
  }

  function handleColumnEdit(columnName, element) {
    // Get the value from the "ALL" row
    const value = $(element).val();

    if (value[0] === "1") {
      // Confirm if the user wants to edit all values in the column
      const confirmEdit = confirm(
        "Are you sure you want to edit all values in the " +
          columnName +
          " column?"
      );
      if (confirmEdit) {
        // Update values in each row of the column
        $("#realEstateTable tbody tr:not(:first)").each(function () {
          $(this)
            .find("." + columnName)
            .val(value)
            .trigger("change");
        });
        // Clear the value in the "ALL" row
        $(element).val("").trigger("change"); // Trigger 'change' to reflect the cleared value
      } else {
        // Clear the value in the "ALL" row
        $(element).val("").trigger("change"); // Trigger 'change' to reflect the cleared value
      }
    }
  }
});
