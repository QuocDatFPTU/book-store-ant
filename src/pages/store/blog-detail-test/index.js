import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

const BlogDetail = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    console.log(123);
    setNumPages(numPages);
  }

  return (
    <div>
      <Document
        file="httexport async function getBlogList(payload) {
          return request(environment.api.blogList, payload, 'GET');
      }ps://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
};

export default BlogDetail;
