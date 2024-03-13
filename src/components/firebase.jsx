import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  and,
} from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyBFZ_j0MqAWJ5_eRAbxNJ7rQxTHkGTS4bk",
  authDomain: "jobswayfinder.firebaseapp.com",
  projectId: "jobswayfinder",
  storageBucket: "jobswayfinder.appspot.com",
  messagingSenderId: "600808263055",
  appId: "1:600808263055:web:326fc31509c11812e08ffa",
  measurementId: "G-F9CPN0QJ30",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function JobsData(lang, job, location) {
  if (job === false || job === true) {
    console.log(location);
    const JobsDataCol = collection(db, "JobsData");
    let q;
    if (lang.length > 0) {
      if (location.length > 0) {
        q = query(
          JobsDataCol,
          and(
            where("job_type", "in", lang),
            where("job_city", "in", location),
            where("job_is_remote", "==", job)
          )
        );
      }
      q = query(
        JobsDataCol,
        and(where("job_type", "in", lang), where("job_is_remote", "==", job))
      );
    } else if (location.length > 0) {
      q = query(
        JobsDataCol,
        and(
          where("job_city", "in", location),
          where("job_is_remote", "==", job)
        )
      );
    } else {
      q = query(JobsDataCol, where("job_is_remote", "==", job));
    }
    const JobSnap = await getDocs(q);
    const JobList = JobSnap.docs.map((doc) => doc.data());
    const data = JobList.map((item, index) => ({
      id: index,
      property: item,
    }));
    return data;
  } else {
    const JobsDataCol = collection(db, "JobsData");
    const JobSnap = await getDocs(JobsDataCol);
    const JobList = JobSnap.docs.map((doc) => doc.data());
    const data = JobList.map((item, index) => ({
      id: index,
      property: item,
    }));
    return data;
  }
}
