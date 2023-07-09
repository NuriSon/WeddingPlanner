$(document).ready(() => {
    $("#modal-button").click(() => {
      $(".modal-body").html("");
      $.get("/vendors?format=json", data => {
        data.forEach(vendor => {
          $(".modal-body").append(
            `<div>
                          <span class="vendor-name">
                              ${vendor.name}
                          </span>
                          <div class="vendor-description">
                              ${vendor.description}
                          </div>
                      </div>`
          );
        });
      });
    });
  });