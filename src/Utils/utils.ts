//utils.ts
import {
   createUserWithEmailAndPassword,
   GoogleAuthProvider,
   sendPasswordResetEmail,
   signInWithPopup,
   User,
} from "firebase/auth";
import { auth, db, rootFireBaseDBPath } from "../providers/providers";
import { getStorage, ref, getMetadata } from "firebase/storage";
import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";

// Function to create a user in Firebase Auth and save the user in Firestore
export const createUserAuthentication = async (
   email: string,
   password: string,
): Promise<{ user: User | null; error: string }> => {
   try {
      // Create the user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return { user: userCredential.user, error: "" }; // Return the created user object
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
   } catch (error: any) {
      console.error("Error creating user in Firebase Auth:", error);
      return { user: null, error: error }; // Return the error as an object
   }
};

// Function to handle Google login and save the user in Firestore
export const handleGoogleLogin = async (): Promise<{ user: User } | { error: string }> => {
   try {
      // Perform Google Sign-In
      const result = await signInWithPopup(auth, new GoogleAuthProvider());
      const user = result.user;

      return { user }; // Return the user object
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
   } catch (error: any) {
      console.error("Error signing in with Google:", error.message);
      return { error: error.message }; // Return the error as an object
   }
};

// Function to handle password reset
export const handleResetPassword = async (email: string) => {
   try {
      sendPasswordResetEmail(auth, email);
   } catch (error) {
      console.error(error);
   }
};
export const doesUserEmailExist = async (emailToCheck: string): Promise<boolean> => {
   try {
      // Reference to the "users" collection
      const usersRef = collection(db, rootPath("users"));

      // Query to find a document where the "email" field matches the provided email
      const q = query(usersRef, where("email", "==", emailToCheck));

      // Fetch documents matching the query
      const querySnapshot = await getDocs(q);

      // If there's at least one document, the email exists
      return !querySnapshot.empty;
   } catch (error) {
      console.error("Error checking user email:", error);
      return false;
   }
};
export const checkIsPdf = async (fileUrl: string) => {
   const storage = getStorage();
   const fileRef = ref(storage, fileUrl);

   try {
      const metadata = await getMetadata(fileRef);
      const contentType = metadata.contentType;

      if (contentType!.includes("application/pdf")) {
         return true;
      } else {
         return false;
      }
   } catch (error) {
      console.error("Error fetching file metadata:", error);
   }
};

export const getSingleDataDB = async (path: string, segment: string) => {
   const docRef = doc(db, rootPath(path), segment);
   const docSnap = await getDoc(docRef);

   return docSnap.exists()
      ? {
           exists: docSnap.exists(),
           snap: docSnap.data(),
        }
      : {
           exists: false,
           snap: null,
        };
};

export const getCollectionDataDB = async (path: string) => {
   try {
      const colRef = collection(db, rootPath(path));
      const colSnap = await getDocs(colRef);

      if (colSnap.empty) {
         console.log(`⚠️ No documents found in collection: ${path}`);
         return { exists: false, data: [] };
      }

      const data = colSnap.docs.map((doc) => ({
         id: doc.id,
         ...doc.data(),
      }));

      console.log(`✅ Retrieved ${data.length} documents from ${path}`);
      return { exists: true, data };
   } catch (error) {
      console.error(`❌ Error retrieving collection (${path}):`, error);
      return { exists: false, data: [] };
   }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createSingleDataDB = async (path: string, segment: string, data?: any, metadata?: any) => {
   // Add a new document in collection "cities"
   const mergeData = {
      ...data,
      ...metadata,
   };
   try {
      await setDoc(
         doc(db, rootPath(path), segment),
         {
            ...mergeData,
         },
         { merge: true },
      );
      return {
         error: false,
         data: mergeData,
      };
   } catch (error) {
      console.error(error);

      return { error: true, data: null };
   }
};

export const rootPath = (path: string, root = rootFireBaseDBPath) => {
   return `${root}/${path}`;
};

export const checkCollectionHasDocuments = async (path: string): Promise<boolean> => {
   try {
      const db = getFirestore(); // Get Firestore instance
      const colRef = collection(db, rootPath(path)); // Reference to the collection
      const colSnap = await getDocs(colRef); // Fetch documents
      return !colSnap.empty; // If there are documents, collection has data
   } catch (error) {
      console.error(`Error checking documents in collection "${path}":`, error);
      return false; // If an error occurs, assume collection is empty
   }
};
