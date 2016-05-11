#include <string>
using namespace std;
#pragma once
class Attribute {
		/** Constant set for numeric attributes. */
	public:
		static const int NUMERIC = 0;

		/** Constant set for nominal attributes. */
		static const int NOMINAL = 1;

		/** Constant set for attributes with string values. */
		static const int STRING = 2;

		/** Constant set for attributes with date values. */
		static const int DATE = 3;

		/** Constant set for relation-valued attributes. */
		static const int RELATIONAL = 4;
		
		Attribute(string attributeName) {
			m_Name = attributeName;
		}
	protected:
		/** The attribute's name. */
		string m_Name;

		/** The attribute's type. */
		int m_Type;

		/** The attribute's index. */
		int m_Index;

		/** The attribute's weight. */
		double m_Weight;

};
