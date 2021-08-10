function genresSet(arreyGenreNames) {
  if (arreyGenreNames.length <= 3) {    
    return arreyGenreNames.join(', ');    
  } else {    
    const newarrey = arreyGenreNames.slice(0,2);    
    return newarrey.join(', ') + ', Other';    
  }  
}

function dataSet(release_date) {
  if (release_date) {
    return new Date(release_date).getFullYear();
  } else {
    return '';
  }
}

export { genresSet, dataSet };